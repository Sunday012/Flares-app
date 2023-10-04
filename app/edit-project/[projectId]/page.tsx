import {redirect} from "next/navigation"
import { getProjectDetail } from "@/lib/actions"
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
import { ProjectInterface } from "@/common.types"
import {getCurrentUser} from "@/lib/session"
const editProject = async ({ params: { projectId} }: { params: { projectId: string } }) => {
    const session = await getCurrentUser();
    const result = await getProjectDetail(projectId) as { project?: ProjectInterface };
    console.log(result?.project)
    if(!session?.user) redirect('/');
    return(
        <Modal>
            <h3 className="modal-head-text">Edit the Project</h3>

            <ProjectForm type="edit" session={session} project={result?.project}/>
        </Modal>
    )
}

export default editProject