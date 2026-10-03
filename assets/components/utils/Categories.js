import addCategory from './addCategory.js';
import searchBox from './searchBox.js';
import { getAllCat } from './logic/useCategories.js';

const Categories = () => {
  getAllCat();
  const data = localStorage.getItem('catData');
  const obj = JSON.parse(data);

  return ` 
    
        ${addCategory()}

        ${searchBox('searchcat', 'Search Category')}
        <div id="category" class="catScroll">
        </div>
        <div id="editcategory" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-l">
                <div class="modal-content  p-4">
                    <div class="p-2 shadow">
                        <div class="modal-header bg-light">
                            <h5 class="h2" id="title">Edit Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div id="editcatres"></div>

                        <div class="row">
                            <div class="col-sm-12 col-md-5 m-auto">
                                <div class="form-group  inputBox  pt-0">		  
                                <input type="text" class="form-control search" id="editcateg"  required>
                                <label for="fullname">Edit Category</label>
                                </div>
                                <input type="hidden" id="ctid" />
                            </div>
                        </div>

                        <div class="modal-footer">
                            <a href="javascript:void(0);" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</a>
                            <a href="javascript:void(0);" id="button" class="btn btn-default btn-sm UpdateCategory">Update Category</a>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>		
`;
};

export default Categories;
