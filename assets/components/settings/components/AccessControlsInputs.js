import { checkBox } from "../../utils/InputFields.js"


const AccessControlsInputs = ({...options}) => {
  const {
    role, data
  } = options
  return `
      <div>
      <h4 class="my-6">Page Settings</h4>
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Dashboard',
            name: '${role}-dashboard',
            check: '',
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Sales',
            name: '${role}-sales',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Users',
            name: '${role}-users',
            check: ''
          })}

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Products',
            name: '${role}-products',
            check: ''
          })}

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'SMS',
            name: '${role}-sms',
            check: ''
          })}

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Settings',
            name: '${role}-settings',
            check: ''
          })}

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Profit & Loss',
            name: '${role}-profitloss',
            check: ''
          })}

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Expenses',
            name: '${role}-expenses',
            check: ''
          })}

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Suppliers',
            name: '${role}-suppliers',
            check: ''
          })}
      </div>


      <div>

          <h4 class="my-6">Sales Settings</h4>

          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Accept Payment',
            name: '${role}-acceptpayment',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Enable new row button',
            name: '${role}-addnewrows',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Edit Unit Price',
            name: '${role}-editunitprice',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Edit Product',
            name: '${role}-editproduct',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Delete Product',
            name: '${role}-deleteproduct',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Edit Customer',
            name: '${role}-editcustomer',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Delete Customer',
            name: '${role}-deletecustomer',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Edit Receipt',
            name: '${role}-editreceipt',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Delete Receipt',
            name: '${role}-deletereceipt',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Edit Sales Invoice',
            name: '${role}-editsalesinvoice',
            check: ''
          })}
          
          ${checkBox({
            classname: 'accessinpt',
            labelname: 'Delete Sales Invoice',
            name: '${role}-deletesalesinvoice',
            check: ''
          })}
      </div>
  
  
  `
}

export default AccessControlsInputs