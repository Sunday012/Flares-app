
import {fetchfilteredProjects} from '@/lib/actions'
import {ProjectInterface} from '@/common.types'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import Categories from '@/components/Categories'
import LoadMore from '@/components/LoadMore'

type ProjectSearch ={
    projectSearch:{
        edges: {node: ProjectInterface}[];
        pageInfo:{
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}
type SearchParams ={
    Category?: string;
    endCursor?: string;
}

type Props = {
    searchParams: SearchParams
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true;
export const revalidate = 0;


const Projects = async ({searchParams: {Category, endCursor}}: Props) => {
    const data = await fetchfilteredProjects(endCursor) as ProjectSearch;
    const projectToDisplay = data?.projectSearch?.edges || [];

    const Pagination = data?.projectSearch?.pageInfo;

    if(projectToDisplay.length === 0){
        return (
            <section className="flexStart flex-col paddings">
              Categories
    
              <p className="no-results-text text-center">No Project found, make some...</p>
            </section>
        )
       }

    return(
        <section className="flex-start flex-col paddings mb-16">
        <Categories />
        <section className="projects-grid">
         {projectToDisplay.map(({node} : {node: ProjectInterface}) =>(
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
        <LoadMore 
        startCursor={Pagination.startCursor}
        endCursor={Pagination.endCursor}
        hasPreviousPage={Pagination.hasPreviousPage}
        hasNextPage={Pagination.hasNextPage}
        />
        </section>
    )
}

export default Projects