'use client';

import { useEffect, useState } from "react";
import MyModal from "../components/MyModal";
import Swal from "sweetalert2";
import axios from 'axios';
import config from '@/app/config';

export default function Page(){
    const [name,setName] = useState('');
    const [remark,setRemark] = useState('');
    const [foodTypes,setFoodType] =useState([]);
    const [id,setId] =useState(0);

    useEffect(() =>{
        fetchData();
    },[]);
    
    const edit =(item:any) =>{
        setId(item.id);
        setName(item.name);
        setRemark(item.remark);
    }
    const handleSave = async () => {
        try{
            const payload ={
                name:name,
                remark:remark,
                id:id
            }
            if(id == 0){
                await axios.post(config.apiServer + '/api/foodType/create', payload);
            }else{
                await axios.put(config.apiServer + '/api/foodType/update', payload);
                setId(0);
            }
            
            fetchData();

            document.getElementById('modalFoodType_btnClose')?.click();
        }catch(e:any){
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
            });
        }
    }

    const fetchData = async () => {
        try {
            const res =await axios.get(config.apiServer + '/api/foodType/list');
            setFoodType(res.data.results);
  
        } catch (e: any) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: e.message
            })
        }
    }

    const handleRemove = async (item: any) => {
        try {
            const button = await Swal.fire({
                title: 'ยืนยันการลบ',
                text: 'คุณต้องการลบใช่หรือไม่',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            })

            if (button.isConfirmed) {
                await axios.delete(config.apiServer + '/api/foodType/remove/' + item.id);
                fetchData();
            }
        } catch (e: any) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    const clearForm=()=>{
        setName(''),
        setRemark(''),
        setId(0)
    }
    return (
        <div className="card mt-3">
            <div className="card-header bg-primary text-white"> <i className="nav-icon fas fa-th mr-2"></i>ประเภทอาหาร/เครื่องดื่ม </div>
            <div className="card-body table-responsive p-3">
                <button 
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalFoodType"
                    onClick={clearForm}
                >
                    <i className="fa fa-plus ne-2"></i>เพิ่มรายการ
                </button>

                <table className='mt-3 table table-striped table-hover'>
                    <thead className="table-dark">

                        <tr>
                            <th style={{ width: '20px' }}></th>
                            <th  style={{ width: '200px' }}>ชื่อ</th>
                            <th>หมายเหตุ</th>
                            <th style={{ width: '110px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodTypes.map((item: any) =>
                            <tr key={item.id}>
                                <td style={{ width: '20px' }}></td>
                                <td>{item.name}</td>
                                <td>{item.remark}</td>
                                <td className='text-center'>
                                    <button className='btn btn-primary me-2'
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalFoodType"
                                        onClick={e =>edit(item)}
                                    >
                                        <i className='fa fa-edit'></i>
                                    </button>
                                    <button className='btn btn-danger' onClick={e => handleRemove(item)}>
                                        <i className='fa fa-times'></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <MyModal id='modalFoodType' title='ประเภทอาหาร/เครื่องดื่ม'>
                <div>ชื่อ</div>
                <input className='form-control' value={name} onChange={e => setName(e.target.value)} />

                <div className='mt-3'>หมายเหตุ</div>
                <input className='form-control' value={remark} onChange={e => setRemark(e.target.value)} />

                <div className='mt-3'>
                    <button className='btn btn-primary' onClick={handleSave}>
                        <i className='fa fa-check me-2'></i>บันทึก
                    </button>
                </div>
            </MyModal>
        </div>
    )
}