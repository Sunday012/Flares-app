import Link from 'next/link'
import Image from 'next/image'
import Skeleton from "react-loading-skeleton";
type Props={
    id:string;
    image:string;
    title:string;
    name:string;
    avatarUrl:string;
    userId:string;
}
const ProjectCard = ({id, image, title,name,avatarUrl,userId} : Props) => {
    return(
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            <Link 
            href={`/project/${id}`}
            className="flexCenter group relative w-full h-full hover:animate-enlarge"
            >
              {image ?(
                <Image src={image} width={414} height={314} className="w-full h-full object-cover rounded-2xl" alt="project"/>
              )
              :(
                <Skeleton width={414} height={314}/>
              )
              }
                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </Link>
            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
              <Link href={`/profile/${userId}`}>
              <div className="flexCenter gap-2">
                {avatarUrl ? (
                  <Image
                   src={avatarUrl}
                   width={24}
                   height={24}
                   className="rounded-full"
                   alt="Profile Image"
                  />
                  
                ):(
                  <Skeleton width={24} height={24}/>
                )}
                {name ? (
                  <p>{name}</p>
                ):(
                  <Skeleton width={40} height={24}/>
                )}
              </div>
              </Link>

              <div className="flexCenter gap-3">
                <div className="flexCenter gap-2">
                   <Image 
                    src="/hearth.svg" width={13}
                    height={12} alt="like"
                   /> 
                   <p className="text-sm">200</p>
                </div>
              </div>
              <div className="flexCenter gap-3">
                <div className="flexCenter gap-2">
                   <Image 
                    src="/eye.svg" width={13}
                    height={12} alt="like"
                   /> 
                   <p className="text-sm">2k</p>
                </div>
              </div>
            </div>
        </div>
    )
}

export default ProjectCard;