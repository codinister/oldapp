
const Table = ( cls='', id='', tablehead,tablebody,tableBodyClass) => (` 
    <div class="div-table">

    <div class="div-table-inner">

        <table class="${cls}" id="${id}" cellspacing="0" cellpadding="0" >
        <thead class="div-table-head">
            ${tablehead}
        </thead>
        <tbody class="div-table-body  ${tableBodyClass}">
            ${tablebody}
        </tbody>
        </table>
    </div>

    </div>

`)

export default Table