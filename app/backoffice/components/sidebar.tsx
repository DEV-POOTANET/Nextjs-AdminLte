'use client'

import { useEffect, useState} from "react"
import config from "@/app/config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
    const [name ,setName] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        const name =localStorage.getItem('next_name');
        setName(name ?? "");
    },[]);

    const singOut = async() =>{
        try{
            const button = await Swal.fire({
                title: "ออกจากระบบ",
                text: "คุณต้องการออกจากระบบ",
                icon: "question",
                showCancelButton:true,
                showConfirmButton:true
              });

              if (button.isConfirmed){
                localStorage.removeItem(config.token);
                localStorage.removeItem('next_name');
                localStorage.removeItem('next_user');

                router.push('/signin')
              }
        }catch(e:any){
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    }
    return(
        <>
            <aside className="main-sidebar sidebar-light-primary elevation-4 " >
                <a href="" className="brand-link bg-primary" style={{ textDecoration: 'none' }}>
                    <span className="brand-text font-weight-light ml-3"><b>POS DEV RESTAURANT</b></span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 d-flex">
                        <div className="image">
                            <img
                            src="../dist/img/avatar4.png"
                            className="img-circle elevation-2"
                            alt="User Image"
                            />
                        </div>
                        <div className="info">
                            <p>คุณ : {name}</p>
                        </div>
                    </div>


                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview"role="menu" data-accordion="false">

                            <li className="nav-header">ตั้งค่าข้อมูลพื้นฐาน</li>

                            <li className="nav-item">
                                <Link href="/backoffice/food-type" className={`nav-link ${pathname === '/backoffice/food-type' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>ประเภทอาหาร</p>   
                                </Link>
                            </li>                            
                        </ul>

                        <hr/>
                        
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview"role="menu" data-accordion="false">
                            <li className="nav-item ">
                                <button className="btn btn-danger w-100" onClick={singOut}>
                                    <i className="nav-icon fas fa-power-off"></i>ออกจากระบบ
                                </button>
                            </li>                            
                        </ul>
                    
                    </nav>

                    
                </div>
            </aside>

            
        </>
    )
}