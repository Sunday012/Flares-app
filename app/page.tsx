import {fetchAllProjects} from '@/lib/actions'
import {ProjectInterface} from '@/common.types'
import ProjectCard from '../components/ProjectCard'
import Image from 'next/image'
import Link from 'next/link'

type ProjectSearch ={
    projectSearch: {
        edges: {node: ProjectInterface}[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
          }
    }
}

const Home = async () => {
   const data = await fetchAllProjects() as ProjectSearch;

   const projectToDisplay = data?.projectSearch?.edges || [];
   
   if(projectToDisplay.length === 0){
    return (
        <section className="flexStart flex-col paddings">
          Categories

          <p className="no-results-text text-center">No Project found, make some...</p>
        </section>
    )
   }

    return(
        <>
        <section>
            <div className="flexCenter">
            <Image 
                 src="/github-sign.png"
                 width={90}
                 height={100}
                 alt="github-logo"
                className="opacity-5"
                />
            </div>
            <div className="flex paddings gap-8">
             <div>
                <Image 
                 src="/coding.png"
                 width={100}
                 height={100}
                 alt="coding-logo"
                 className="opacity-5 pt-28"
                />
             </div>
            <div className='flexCenter flex-col flex-wrap text-2xl pt-18'>
            <Image  src={'/Flare_landing_page_logo.png'}
            width={500}
            height={400}
            alt="flare_landing_logo"
            className="mb-14"
            />
            <h1 className='flexCenter flex-wrap'>Browse and discover the best projects from top notch programmers around the  <span className='text-blue-800'>World</span></h1>
         
            </div>
            <div className="flex gap-10 pt-32">
            <Image 
                 src="/google (2).png"
                 width={70}
                 height={70}
                 alt="google-logo"
                 className="opacity-5"
                />
            </div>
            </div>
            
        </section>
     
        <section className="flex-start flex-col paddings mb-16">
            <Link
            href='/all-project'
            className="flexEnd paddings"
            >
            <span>View all</span>
            
            </Link>
          
            <section className="projects-grid">
                {projectToDisplay.map(({node} : {node: ProjectInterface}) => (
                 <ProjectCard key={node?.id}
                 id={node?.id}
                 image={node?.image}
                 title={node?.title}
                 name={node?.createdBy?.name}
                 avatarUrl={node?.createdBy?.avatarUrl}
                 userId={node?.createdBy?.id}
                 />
             )
             )}
             </section>
             <h1>LoadMore</h1>
         </section>
       
        </>
    )
}

export default Home;