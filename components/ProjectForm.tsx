"use client"

import {SessionInterface, ProjectInterface} from "@/common.types"
import {categoryFilters} from '@/constants'
import {ChangeEvent, useState} from "react"
import {createNewProject, fetchToken, editProject} from '../lib/actions'
import Image from 'next/image'
import FormField from './FormField'
import CustomMenu from './CustomMenu'
import Button from './Button'
import {useRouter} from 'next/navigation'

type Props = {
    type: string,
    session: SessionInterface
    project?: ProjectInterface
} 

const ProjectForm =  ( {type, session,project} : Props) => {
    const route = useRouter()
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
       const {token }= await fetchToken()


       try {
        if (type === 'create') {
          await createNewProject(form, session?.user?.id, token);
          route.push('/');
        } 
        
        if (type === 'edit') {
          await editProject(form, project?.id as string, token,);
          route.push('/');
        }
       
      } catch (error) {
        throw error;
      }
    };
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')){
            return alert('please upload your project image');
        }

        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload =() => {
            const result = reader.result as string;

            handleStateChange('image', result)
        }
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({...prevState, [fieldName]:
        value}))
    };

    const[isSubmitting, setIsSubmitting] = useState(false)
   const [form, setForm] = useState({
     title:project?.title || '',
     description:project?.description || '',
     image:project?.image || '',
     liveSiteUrl:project?.liveSiteUrl || '',
     gitHubUrl:project?. gitHubUrl || '',
     category:project?. category || '',
   })

    return(
        <form onSubmit={handleFormSubmit} className="flexStart form">
         <div className="flexStart form_image-container">
            <label htmlFor='poster' className="flexCenter form_image-label">
               {!form.image && 'choose a poster for your project'}
            </label>
            <input 
             id='image'
             type='file'
             accept='image/*'
             required={type === 'create'}
             className="form_image-input"
             onChange={handleChangeImage}
            />
            {form.image &&
            <Image 
              src={form?.image}
              className="sm:p-10 object-contain z-20"
              alt="Project-poster"
              fill
            />  
            }
         </div>

        <FormField 
          title="Title"
          state={form.title}
          placeholder="Flare"
          setState={(value) => handleStateChange('title', value)}
        />
        <FormField 
          title="   Description"
          state={form.description}
          placeholder="Showcase your work in text"
          setState={(value) => handleStateChange('description', value)}
        />
        <FormField 
          type="url"
          title="Website Url"
          state={form.liveSiteUrl}
          placeholder="https://flare.com"
          setState={(value) => handleStateChange('liveSiteUrl', value)}
        />
        <FormField 
          type="url"
          title="GitHub URL"
          state={form.gitHubUrl}
          placeholder="https://github.com/sunday012"
          setState={(value) => handleStateChange('gitHubUrl', value)}
        />
      
        <CustomMenu 
          title="Category"
          state={form.category}
          filters={categoryFilters}
          setState={(value) => handleStateChange('category', value)}
        />

       
        <div className="flexStart w-full">
          <Button 
            title={isSubmitting ? `${type === 'create' ? 'creating':'Editing'}` 
            : `${type === 'create' ? 'Create' : 'Edit'}`
            }
            type="submit"
            leftIcon={isSubmitting ? "" : '/plus.svg'}
            isSubmitting={isSubmitting}
          />
        </div>
        </form>
    )
}

export default ProjectForm;