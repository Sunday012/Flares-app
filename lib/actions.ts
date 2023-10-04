import { GraphQLClient } from 'graphql-request'
import {deleteProjectMutation, getProjectsOfUserQuery, getUserQuery} from '@/graphql';
import {createUserMutation, createProjectMutation, projectsQuery,getProjectByIdQuery,updateProjectMutation,projectQuery} from '@/graphql';
import {ProjectForm} from '@/common.types'

const isProduction = process.env.NODE_ENV === 
'production'
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL
|| '' : 'http://127.0.0.1:4000/graphql'

const apiKey = isProduction ? 
process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL :
 'http://localhost:3000';

const client = new GraphQLClient(apiUrl)

const makeGraphQLRequest = async (query: string, 
variables = {}) => {
    try{
     return await client.request(query, variables)
    }catch(error) {
        throw error;
    }
}

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email })
}
export const createUser = (name: string, email:
 string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey);
  const variables = {
    input: {
        name, email, avatarUrl
    }
  }

  return makeGraphQLRequest(createUserMutation, variables)
}

export const fetchToken = async () => {
  try{
    const response = await fetch(`${serverUrl}/api/auth/token`)
    return response.json()
  }catch(error){
    throw error;
  }
}

export const uploadImage = async (imagePath : string) => {
  try{
     const response = await fetch(`${serverUrl}/api/upload`,{
       method: 'POST',
       body: JSON.stringify({path: imagePath})
     })

     return response.json();
  }catch(error){
    throw error;
  }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);
  client.setHeader('Authorization', `Bearer ${token}`);
 const variables = {
   input: {
      ...form,
      image: imageUrl.url,
      createdBy: {
        link: creatorId
      }
   }
 }
  if(imageUrl.url){

  return makeGraphQLRequest(createProjectMutation, variables)
  }
}


export const fetchAllProjects = async (endcursor?: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(projectQuery, {endcursor})
}
export const fetchfilteredProjects = async (endCursor?: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(projectsQuery, {endCursor})
}

export const getProjectDetails = (id:string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id })
}
export const getProjectDetail = (id:string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, {id})
}

export const getUserProjects = (id:string,last?:number) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, {id, last})
}

export const deleteProject = (id:string, token:string) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, {id})
}
export const editProject = async (form:ProjectForm, projectId:string ,token:string) => {
  function isBase64Url(value: string) {
    const base64UrlPattern = /^(https:\/\/|http:\/\/)?([A-Za-z0-9+/]{4})*(?:(?:[A-Za-z0-9+/]{2}==)|[A-Za-z0-9+/]{3}=)?$/;
    return base64UrlPattern.test(value);
  }
let updatedForm = {...form};
const isUploadedNewImage =  isBase64Url(form.image);

if(isUploadedNewImage){
  const imageUrl = await uploadImage(form.image);

  if(imageUrl.url){
    updatedForm ={
      ...form,
      image: imageUrl.url
    }
  }
}

const variables = {
  id: projectId,
  input: updatedForm
}

  client.setHeader('Authorization', `Bearer ${token}`);
  return makeGraphQLRequest(updateProjectMutation, variables)
}