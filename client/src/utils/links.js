import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { RiHomeOfficeFill } from "react-icons/ri";



const links = [
    {id:1, text: 'stats', path:'/', icon: <IoBarChartSharp />},
    {id:2, text: 'all jobs', path:'all-jobs', icon: <MdQueryStats />},
    {id:3, text: 'add job', path:'add-job', icon: <FaWpforms />},
    {id:4, text: 'profile', path:'profile', icon: <ImProfile />},
    {id:5, text: 'create company', path:'company', icon: <RiHomeOfficeFill />},
    {id:5, text: 'companies', path:'companies', icon: <RiHomeOfficeFill />},
]

export default links