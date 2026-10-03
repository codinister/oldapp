const addCategory = () => {
  return `

        <a href="" class="btn btn-default rounded-lg btn-sm mt-3 mb-5"  data-toggle="modal" data-target="#addcategory">Add Category</a>

        <div id="addcategory" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-l">
                <div class="modal-content  p-4">
                    <div class="p-2 shadow">

                        <div class="modal-header bg-light">
                            <h5 class="h2" id="title">New Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>

                        <div id="catres"></div>

                        <div class="row">
                            <div class="col-sm-12 col-md-5 m-auto">
                            <div class="form-group  inputBox  pt-0">		  
                            <input type="text" class="form-control search" id="categ"  required>
                            <label for="fullname">Add Category</label>
                            </div>
                            </div>
                            </div>
                            <div class="modal-footer">
                            <a href="javascript:void(0);" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</a>
                            <a href="javascript:void(0);" id="button" class="btn btn-default btn-sm 
                            AddCategory">Add Category</a>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>		

    
    `;
};

export default addCategory;
