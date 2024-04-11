import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  collectionData,
  query,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class firebaseService {
  // signIn(arg0: User) {
  //   throw new Error('Method not implemented.');
  // }

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);
  storage = inject(AngularFireStorage);

  // ================== Authentication==================

  getAuth() {
    return getAuth();
  }

  // =========== Acceder ============

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // =========== Create User ============

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // =========== Update User ============
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // =========== Send email to reset password ============
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // =========== Sign out ============
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  // =========== Data Base ============

  // =========== get documents from a collection ============
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), { idField: 'id' });
  }

  // =========== Set Document ============
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // =========== Updated Document ============
  updateDoc(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  // =========== Delete Document ============
  deleteDoc(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  // =========== Get Document ============
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // =========== Add Document ============
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // =================================== Storage ===============================

  // =========== Upload img ============
  async uploadImage(path: string, data_url: string) {
    console.log('Path new: ', path);
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(()=> {
      return getDownloadURL(ref(getStorage(), path));
    })
  
  }

  // =========== Get route of the image and the url ============
  async getFilePath(url: string) {
     return ref(getStorage(), url).fullPath;
  }

  // ========== Delete File ==========
  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }
}
