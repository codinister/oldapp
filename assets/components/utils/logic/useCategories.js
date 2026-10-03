import {getIDvalue,response,loading} from '../../Modules.js';
import getCategories from '../getCategories.js';

    const catOutput = data => Object.values(data).map(v => ` 
        <div class="row border-bottom">
            <div class="col-sm-12 col-md-8 pt-1 pb-1">
                <a href="javascript:void(0);" class="pCats" 
                data-cat_id = "${v.cat_id}" style="font-size: 12px; color:black; word-wrap: break-word;">
                ${v.cat_name}
                </a>
            </div>
            <div class="col-sm-12 col-md-2  pt-1 pb-1">
                <a href="javacript:void(0);"   data-toggle="modal" data-target="#editcategory" class='vc'>
                <i class="fa fa-edit text-right vcategory" title="Edit category" data-cat_id = "${v.cat_id}" style="font-size: 11px;"></i>
                </a>
            </div>
            <div class="col-sm-12 col-md-2  pt-1 pb-1">
                <a href="javascript:void(0);">
                <i class="fa fa-trash text-right deletecategory" data-cat_id = "${v.cat_id}" style="font-size: 11px;" title="Delete category"></i>
                </a>
            </div>
        </div>
    ` 
    ).join('')







    const getAllCat = async () => {
        const resp = await fetch('router.php?controller=products&task=categories');
        const data = await resp.json();
        //return data;

        localStorage.setItem('catData', JSON.stringify(data));
        const output = catOutput(data)
        document.getElementById('category').innerHTML = output;

        getCategories((data)=>{
            document.querySelector('.categoryx').innerHTML = '<option value="" hidden>Category</option>'+data;
        })
    }

    const addCats = async () => {
        const cat = getIDvalue("categ");
        var fd = new FormData();
        fd.append("cat", cat);
        fd.append("controller", "products");
        fd.append("task", "add_category");
        loading();
        const resp = await fetch('router.php', {
            method : 'Post',
            body : new URLSearchParams(fd)
        })
        const data = await resp.text()
        response('catres', data);
        getAllCat()
    }

    const editCats = async () => {
        const cat = getIDvalue("editcateg");
        const ctid = getIDvalue('ctid');
        var fd = new FormData();
        fd.append("cat", cat);
        fd.append('cat_id', ctid);
        fd.append("controller", "products");
        fd.append("task", "update_category");
        loading();
        fetch('router.php', {
            method : 'Post',
            body : new URLSearchParams(fd)
        })
        .then(resp => resp.text())
        .then(data => {
            response('editcatres', data);
            getAllCat()
        });
    }

    const deleteCats = async (cat_id) => {
        await fetch(`router.php?controller=products&task=delete_category&cat_id=${cat_id}`)
        getAllCat()
    }

    export { getAllCat,addCats,editCats,deleteCats,catOutput };