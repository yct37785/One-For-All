/******************************************************************************************************************
 * Firestore data model
 * ---------------------------------------------------------------------------------------------------------------
 * Firestore paths alternate strictly as: COLLECTION / DOCUMENT / COLLECTION / DOCUMENT / ...
 *
 * In this project, all data lives under a user "bucket":
 *   `/{root}/{uid}/{...}`
 * where:
 *   - `{root}` is a COLLECTION name (e.g., "allergies")
 *   - `{uid}`  is the current user's DOCUMENT id
 *
 * After `{uid}`, the remaining segments (`{document=**}` or a collection path) must preserve alternation:
 *   - A **document path** ends on a DOCUMENT ⇒ the number of remaining segments after `{uid}` must be EVEN (≥ 2).
 *     Example: "type/solid" (2 segments) or "a/b/c/d" (4 segments).
 *   - A **collection path** ends on a COLLECTION ⇒ the number of remaining segments after `{uid}` must be ODD (≥ 1).
 *     Example: "type" (1 segment) or "a/b/c" (3 segments).
 *
 * This file enforces those expectations:
 *   - `readFirestoreDoc`, `updateFirestoreDoc`, `deleteFirestoreDoc` expect a DOCUMENT path (even).
 *   - `listAllFirestoreDocs` expects a COLLECTION path (odd).
 *
 * If a path does not meet the expectation, we throw a loud error early to avoid confusing Firestore errors later.
 ******************************************************************************************************************/
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  getDocs
} from '@react-native-firebase/firestore';

/******************************************************************************************************************
 * Normalize an arbitrary path into a clean slash-joined string.
 *
 * @param parts - Path parts (string or string[]) accepted by public APIs
 *
 * @return - Normalized path segment (no leading/trailing slashes)
 *
 * @throws {Error} if no parts are provided after normalization
 ******************************************************************************************************************/
function normalizePath(parts: string | string[]): string {
  const segs = (Array.isArray(parts) ? parts : [parts])
    .flatMap((s) => `${s}`.split('/'))
    .map((s) => s.trim())
    .filter(Boolean);
  if (!segs.length) throw new Error('Invalid path');
  return segs.join('/');
}

/******************************************************************************************************************
 * Compute `${root}/${uid}/${tail}` and return tail segments for parity checks.
 *
 * @param root  - Top-level collection/table (e.g., "allergies")
 * @param tail  - Remaining path under the user (document or collection path)
 *
 * @return - where:
 *  - absPath   - The absolute Firestore path
 *  - tailSegs  - The normalized array of tail segments (after `{uid}`)
 *
 * @throws {Error} if no authenticated Firebase user is available
 ******************************************************************************************************************/
function makeUserScopedAbsPath(
  root: string,
  tail: string | string[],
): { absPath: string; tailSegs: string[] } {
  const auth = getAuth(getApp());
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No Firebase user found');

  const rootNorm = normalizePath(root);
  const tailNorm = normalizePath(tail);
  const tailSegs = tailNorm.split('/').filter(Boolean);

  return {
    absPath: `${rootNorm}/${uid}/${tailNorm}`,
    tailSegs,
  };
}

/******************************************************************************************************************
 * Ensure a DOCUMENT path (even number of tail segments after `{uid}`, >= 2).
 *
 * @throws {Error} if the tail is not a valid document path
 ******************************************************************************************************************/
function assertDocumentTail(tailSegs: string[]): void {
  if (tailSegs.length < 2 || tailSegs.length % 2 !== 0) {
    throw new Error(
      `Expected a DOCUMENT path after {uid} (even segment count ≥ 2), got ${tailSegs.length} segments.`,
    );
  }
}

/******************************************************************************************************************
 * Ensure a COLLECTION path (odd number of tail segments after `{uid}`, >= 1).
 *
 * @throws {Error} if the tail is not a valid collection path
 ******************************************************************************************************************/
function assertCollectionTail(tailSegs: string[]): void {
  if (tailSegs.length < 1 || tailSegs.length % 2 !== 1) {
    throw new Error(
      `Expected a COLLECTION path after {uid} (odd segment count ≥ 1), got ${tailSegs.length} segments.`,
    );
  }
}

/******************************************************************************************************************
 * [ASYNC] Read a single document (schemaless JSON) at `/{root}/{uid}/{document=**}`.
 *
 * Path requirement: DOCUMENT path (even number of segments after `{uid}`).
 *
 * @param root          - Root collection/table (e.g., "allergies")
 * @param documentPath  - Trailing path under the user that ends at a document (e.g., "type/solid")
 *
 * @return - Plain JSON (Record<string, any>) if the document exists, otherwise `undefined`
 *
 * @throws {Error} if there is no Firebase user, the path is not a document path, or Firestore access fails
 *
 * @usage
 * ```ts
 * const doc = await readFirestoreDoc('allergies', 'type/solid');
 * if (doc) console.log(doc.name);
 * ```
 ******************************************************************************************************************/
export async function readFirestoreDoc(
  root: string,
  documentPath: string | string[],
): Promise<Record<string, any> | undefined> {
  const db = getFirestore(getApp());
  const { absPath, tailSegs } = makeUserScopedAbsPath(root, documentPath);
  assertDocumentTail(tailSegs);

  const ref = doc(db, absPath);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Record<string, any>) : undefined;
}

/******************************************************************************************************************
 * [ASYNC] Create or update a single document (schemaless JSON) at `/{root}/{uid}/{document=**}`.
 *
 * Path requirement: DOCUMENT path (even number of segments after `{uid}`).
 *
 * NOTES:
 * - Accepts full or partial objects. Use `merge=true` (default) for partial updates; set `merge=false` to replace.
 * - Automatically writes `_updatedAt` with a server timestamp on every write.
 *
 * @param root          - Root collection/table (e.g., "allergies")
 * @param documentPath  - Trailing path under the user that ends at a document (e.g., ["type","solid"])
 * @param data          - JSON to write (full or partial)
 * @param merge?        - If true (default), merges fields; if false, replaces the document
 *
 * @throws {Error} if there is no Firebase user, the path is not a document path, or Firestore access fails
 *
 * @usage
 * ```ts
 * await updateFirestoreDoc('allergies', ['type','solid'], { name: 'Peanuts' });                  // merge (partial)
 * await updateFirestoreDoc('allergies', ['type','solid'], { name: 'Almonds', kind: 'solid' }, false); // replace
 * ```
 ******************************************************************************************************************/
export async function updateFirestoreDoc(
  root: string,
  documentPath: string | string[],
  data: Record<string, any>,
  merge: boolean = true,
): Promise<void> {
  const db = getFirestore(getApp());
  const { absPath, tailSegs } = makeUserScopedAbsPath(root, documentPath);
  assertDocumentTail(tailSegs);

  const ref = doc(db, absPath);
  await setDoc(ref, { ...data, _updatedAt: serverTimestamp() }, { merge });
}

/******************************************************************************************************************
 * [ASYNC] Delete a single document at `/{root}/{uid}/{document=**}`.
 *
 * Path requirement: DOCUMENT path (even number of segments after `{uid}`).
 *
 * @param root          - Root collection/table (e.g., "allergies")
 * @param documentPath  - Trailing path under the user that ends at a document (e.g., "type/solid")
 *
 * @throws {Error} if there is no Firebase user, the path is not a document path, or Firestore access fails
 *
 * @usage
 * ```ts
 * await deleteFirestoreDoc('allergies', 'type/solid');
 * ```
 ******************************************************************************************************************/
export async function deleteFirestoreDoc(
  root: string,
  documentPath: string | string[],
): Promise<void> {
  const db = getFirestore(getApp());
  const { absPath, tailSegs } = makeUserScopedAbsPath(root, documentPath);
  assertDocumentTail(tailSegs);

  const ref = doc(db, absPath);
  await deleteDoc(ref);
}

/******************************************************************************************************************
 * [ASYNC] List all document IDs under `/{root}/{uid}/{collectionPath}`.
 *
 * Path requirement: COLLECTION path (odd number of segments after `{uid}`).
 *
 * @param root            - Root collection/table (e.g., "allergies")
 * @param collectionPath  - Trailing path under the user that ends at a collection (e.g., "type")
 *
 * @return - Array of Firestore document IDs (string)
 *
 * @throws {Error} if there is no Firebase user, the path is not a collection path, or Firestore access fails
 *
 * @usage
 * ```ts
 * const ids = await listAllFirestoreDocs('allergies', 'type');
 * // ids might look like: ["solid", "liquid", "airborne"]
 *
 * // To read one document:
 * const solid = await readFirestoreDoc('allergies', ['type','solid']);
 * ```
 ******************************************************************************************************************/
export async function listAllFirestoreDocs(
  root: string,
  collectionPath: string | string[],
): Promise<string[]> {
  const app = getApp();
  const db = getFirestore(app);
  const { absPath, tailSegs } = makeUserScopedAbsPath(root, collectionPath);
  assertCollectionTail(tailSegs);

  const colRef = collection(db, absPath);
  const snap = await getDocs(colRef);

  return snap.docs.map((d: any) => d.id);
}
