// import {getCurrentUser} from '@/lib/session'
// import {getProjectDetails} from '@/lib/actions';
// import {ProjectInterface} from '@/common.types';
// import Image from 'next/image';
// import Actions from '@/components/Actions';
// import MoreProjects from '@/components/relatedProjects';
// const Project = async ({params: {id}} : {params:{id:string}}) => {
//     const session = await getCurrentUser();
//     const results = await getProjectDetails(id) as {
//         project?: ProjectInterface
//     };

//     if(!results?.project){
//         return "failed to get details for this project"
//     }

//     console.log(results?.project)
//     return(
//         <div>
//             <Actions id={project?.id}/>
//              <div className='flexCenter'>
//                 <Image 
//                 src={results?.project?.image}
//                 width={700}
//                 height={700}
//                 alt='project_deatail-img'
//                 />
//              </div>
//              <div  className='flexStart flex-col'>
//              <p>{results?.project?.title}</p>
//              <p>{results?.project?.description}</p>
//              </div>
//              <div className='flexStart'>
//                 <Image 
//                 src={results?.project?.createdBy.avatarUrl}
//                 height={30}
//                 width={30}
//                 alt='project_owner'
//                 />
//              </div>
//              {/* <div className='flexBewteen'>
//                 <span>More by this user</span>
//                 <span>View all</span>
//              </div> */}
//              <div>
//              {/* <MoreProjects /> */}
//              </div>
//         </div>
//     )
// }

// export default Project;

import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getProjectDetails } from "@/lib/actions"
import Modal from "@/components/Modal"
import RelatedProjects from "@/components/relatedProjects"
import { ProjectInterface } from "@/common.types"
import ProjectActions from "@/components/Actions"
import Skeleton from "react-loading-skeleton";


const Project = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser()
    const result = await getProjectDetails(id) as { project?: ProjectInterface}

    if (!result?.project) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )

    const projectDetails = result?.project

    const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

    return (
        <Modal>
            <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    {projectDetails?.createdBy?.avatarUrl ?
                    (
                    <Link href={renderLink()}>
                        <Image
                            src={projectDetails?.createdBy?.avatarUrl}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>

                    ):(
                       <Skeleton  width={50}
                       height={50}/>
                    )
                    }

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {projectDetails?.title}
                        </p>
                        <div className="user-info">
                            <Link href={renderLink()}>
                                {projectDetails?.createdBy?.name}
                            </Link>
                            <Image src="/dot.svg" width={4} height={4} alt="dot" />
                            <Link href={"/"} className="text-blue-800 font-semibold"> 
                                {projectDetails?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={projectDetails?.id} />
                    </div>
                )}
            </section>

            <section className="mt-14">
                {
                    projectDetails?.image ? (
                        <Image
                            src={`${projectDetails?.image}`}
                            className="object-cover rounded-2xl"
                            width={1060}
                            height={700}
                            alt="poster"
                        />
                    )
                    :(
                        <Skeleton  width={1060}
                        height={700}/>
                    )
                }
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {projectDetails?.description}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <Link href={projectDetails?.gitHubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 text-lg font-medium text-blue-800">
                        <span>Github</span> 
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link href={projectDetails?.liveSiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 text-lg font-medium text-blue-800">
                        <span>Live Site</span> 
                    </Link>
                </div>
            </section>
      
            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                {projectDetails?.createdBy?.avatarUrl ? (
                   <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                       src={projectDetails?.createdBy?.avatarUrl}
                       className="rounded-full"
                       width={82}
                       height={82}
                       alt="profile image"
                    />
                   </Link>
                )
                   :(
                    <Skeleton  width={82}
                    height={82} className="rounded-full"/>
                   )
                }
               
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

           <RelatedProjects 
            userId={projectDetails?.createdBy?.id}
            projectId={projectDetails?.id}
           />
        </Modal>
    )
}

export default Project;