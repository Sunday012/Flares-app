"use client"
// import React from 'react'
import Image from 'next/image'
import { deleteProject,fetchToken } from '@/lib/actions'
// import { ProjectInterface } from '@/common.types'
import Link from 'next/link'
import {useState} from 'react'



import React from 'react'
import {useRouter} from 'next/navigation'

const Actions = ({projectId} : {projectId: string}) => {
  const router = useRouter()
const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteProject = async () => {
     setIsDeleting(true);

     const {token} = await fetchToken();
     try{
        await deleteProject(projectId, token)
        router.push('/');
     }catch(error){
        throw error
     }
  }

  return (
    <>
      <Link href={`/edit-project/${projectId}`}
      className="flexCenter edit-action_btn">
       <Image 
         src="/pencile.svg"
         width={15}
         height={15}
         alt="edit-btn"
       />
      </Link>
      <button type="button"
      className={`flexCenter delete-action_btn bg-gray
      ${isDeleting ? 'bg-gray': 'bg-blue-800'}`}
      onClick={handleDeleteProject}
      >
      <Image 
         src="/trash.svg"
         width={15}
         height={15}
         alt="edit-btn"/>
      </button>
    </>
  )
}

export default Actions