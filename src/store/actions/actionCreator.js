import { API_URL } from "../../config/api";
import axios from 'axios';
import {
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_REJECTED,
  FETCH_USERS_LOADING,
  GET_USER_SUCCESS,
  GET_USER_REJECTED,
  GET_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_REJECTED,
  CREATE_USER_LOADING, 
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REJECTED,
  UPDATE_USER_LOADING,
  DELETE_USER_SUCCESS,
  DELETE_USER_REJECTED,
  DELETE_USER_LOADING
} from './actionTypes';

const fetchUsersSuccess = (data) => ({
  type: FETCH_USERS_SUCCESS,
  payload: data
});
const fetchUsersRejected = () => ({
  type: FETCH_USERS_REJECTED
});
const fetchUsersLoading = (data) => ({
  type: FETCH_USERS_LOADING,
  payload: data
});
export const fetchUsers = (pageNumber) => {
  return async (dispatch, getState) => {
    dispatch(fetchUsersLoading(true));
    try {
      const { data } = await axios.get(`${API_URL}?p=${pageNumber || 1}`);
      dispatch(fetchUsersSuccess(data));
    } catch(err) {
      dispatch(fetchUsersRejected());
      throw err;
    } finally {
      dispatch(fetchUsersLoading(false));
    }
  }
};

const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data
});
const getUserRejected = () => ({
  type: GET_USER_REJECTED
});
const getUserLoading = (data) => ({
  type: GET_USER_LOADING,
  payload: data
});
export const getUser = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserLoading(true));
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      dispatch(getUserSuccess(data));
    } catch(err) {
      dispatch(getUserRejected());
      throw err;
    } finally {
      dispatch(getUserLoading(false));
    }
  }
};

const createUsersSuccess = () => ({
  type: CREATE_USER_SUCCESS
});
const createUsersRejected = () => ({
  type: CREATE_USER_REJECTED
});
const createUsersLoading = (data) => ({
  type: CREATE_USER_LOADING,
  payload: data
});
export const createUser = (data) => {
  return async (dispatch, getState) => {
    dispatch(createUsersLoading(true));
    try {
      if (!data?.dateOfBirth?.trim()) data.dateOfBirth = null;
      await axios.post(API_URL, data);
      dispatch(createUsersSuccess());
    } catch(err) {
      dispatch(createUsersRejected());
      throw err;
    } finally {
      dispatch(createUsersLoading(false));
    }
  }
};

const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS
});
const updateUserRejected = () => ({
  type: UPDATE_USER_REJECTED
});
const updateUserLoading = (data) => ({
  type: UPDATE_USER_LOADING,
  payload: data
});
export const updateUser = (id, data) => {
  return async (dispatch, getState) => {
    dispatch(updateUserLoading(true));
    try {
      if (!data?.dateOfBirth?.trim()) data.dateOfBirth = null;
      await axios.put(`${API_URL}/${id}`, data);
      dispatch(updateUserSuccess());
    } catch(err) {
      dispatch(updateUserRejected());
      throw err;
    } finally {
      dispatch(updateUserLoading(false));
    }
  }
};

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS
});
const deleteUserRejected = () => ({
  type: DELETE_USER_REJECTED
});
const deleteUserLoading = (data) => ({
  type: DELETE_USER_LOADING,
  payload: data
});
export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch(deleteUserLoading(true));
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteUserSuccess());
      dispatch(fetchUsers());
    } catch(err) {
      dispatch(deleteUserRejected());
      throw err;
    } finally {
      dispatch(deleteUserLoading(false));
    }
  }
};