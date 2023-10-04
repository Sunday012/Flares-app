import { UserProfile, ProjectInterface } from '@/common.types';
import { getUserProjects } from '@/lib/actions'
import Link from 'next/link'
import Image from 'next/image'
// import React from 'react'

// const relatedProjects = async ({params:{id,last}}: {params:{id:string,last:string}}) => {
// const data = await getUserProjects(id, last) as {
//   project?: ProjectInterface
// }

//   return (
//     <div>
//       <div>
//         <span>More by this user</span>
//         <span>View all</span>
//       </div>
//     </div>
//   )
// }

// export default relatedProjects

type Props = {
  userId: string;
  projectId:string
}

const relatedProjects = async ({userId, projectId} : Props) => {

  const results = await getUserProjects(userId) as {
    user?: UserProfile 
  }

  const filterProjects = results?.user?.projects?.edges?.filter(
    ({node} : {node: ProjectInterface}) => node?.id !== projectId
  )

  console.log(filterProjects)
  if(filterProjects?.length === 0) return null;
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {results?.user?.name}</p>
        <Link 
        href={`/profile/${results?.user?.id}`}
        className="text-blue-800 text-base"
        >
          View all
        </Link>
      </div>
      <div className="related_projects-grid">
        {filterProjects?.map(({node}: {node: ProjectInterface}) => (
            <div className="flexCenter related_projects-card drop-shadow-card">
               <Link
               href={`/project/${node?.id}`}
               className="flexCenter group-relative w-full h-full"
               >
               <Image 
               src={node?.image}
               width={414}
               height={314}
               className="w-full h-full object-cover rounded-2xl"
               alt="project-image"
               />
               <div className="hidden group-hover:flex related_project-card_title">
              <p className="w-full">{node?.title}</p>
               </div>
               </Link>
            </div>
           )
        )
        }
      </div>
    </section>
  )
}

export default relatedProjects