import customersprofile from './data/serverside/fetch/customersprofile.js';
import Layout from './Layout.js';
import { formatDate, ymd } from './utils/DateFormats.js';
import format_number from './utils/format_number.js';
import { textInput } from './utils/InputFields.js';
import calculateReceiptBalance from './utils/calculateReceiptBalance.js';
const Reports = () => {
  customersprofile((customers) => {
    if (localStorage.getItem('filterdates')) {
      localStorage.removeItem('filterdates');
    }

    const HTMLList = (obj) => {
      const calc = calculateReceiptBalance(obj);

      return [...obj]
        .map((v) => {
          const balance = Number(v.total) - calc(v.tax_id, v.pay_id)
          return `
      <tr class="sales-report-table-row">
        <td>
        ${v.fullname}
        </td>
        <td>${formatDate(v.createdAt)}</td>
        <td>${format_number(v.payment)}</td>
        <td>${format_number(balance)}</td>
        <td>${v.receipt_no}</td>
        <td>${v.profile}</td>
      </tr>
    
      `;
        })
        .join(' ');
    };

    const sett = JSON.parse(localStorage.getItem('sinpt'));

    document.addEventListener('click', (e) => {
      if (e.target.matches('.print-sales-report')) {
        window.print();
      }
      if (e.target.matches('.sales-report-btn')) {
        const payments = customers.map((v) => v.receipt_list).flat(2);

        const data = JSON.parse(localStorage.getItem('filterdates'));

        if (data?.start_date && data?.end_date) {
          if (data?.start_date === data?.end_date) {
            const sdate = data?.start_date;
            const date = new Date(sdate);

            const res = payments
              .filter((v) => {
                const cdate = new Date(v.createdAt);
                if (ymd(cdate) === ymd(date)) {
                  return v;
                }
              })
              .filter(Boolean);

            if (res.length > 0) {
              document.querySelector('.rpdate').innerHTML = formatDate(date);

              document.querySelector(
                '.sales-total'
              ).innerHTML = `GHs ${format_number(
                [...res].reduce((a, b) => {
                  return Number(a) + Number(b.payment);
                }, 0)
              )}`;

              document.querySelector('.sales-report-body').innerHTML =
                HTMLList(res);
            } else {
              document.querySelector('.sales-report-body').innerHTML =
                'No result found';
            }
          } else {
            const sdate = data?.start_date;
            const edate = data?.end_date;
            const start_date = new Date(sdate);
            const end_date = new Date(edate);

            const res = payments
              .filter((v) => {
                const cdate = new Date(v.createdAt);
                if (
                  ymd(cdate) >= ymd(start_date) &&
                  ymd(cdate) <= ymd(end_date)
                ) {
                  return v;
                }
              })
              .filter(Boolean);

            if (res.length > 0) {
              document.querySelector('.rpdate').innerHTML =
                formatDate(sdate) + '-' + formatDate(edate);

              document.querySelector(
                '.sales-total'
              ).innerHTML = `GHs ${format_number(
                [...res].reduce((a, b) => {
                  return Number(a) + Number(b.payment);
                }, 0)
              )}`;

              document.querySelector('.sales-report-body').innerHTML =
                HTMLList(res);
            } else {
              document.querySelector('.sales-report-body').innerHTML =
                'No result found';
            }
          }
        }
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches('.start_date')) {
        const { value } = e.target;
        if (!localStorage.getItem('filterdates')) {
          localStorage.setItem(
            'filterdates',
            JSON.stringify({
              start_date: value,
              end_date: '',
            })
          );
        } else {
          const obj = JSON.parse(localStorage.getItem('filterdates'));

          obj['start_date'] = value;

          localStorage.setItem('filterdates', JSON.stringify(obj));

          const data = JSON.parse(localStorage.getItem('filterdates'));

          if (data?.start_date && data?.end_date) {
            document.querySelector('.sales-report-btn').classList.add('show');

            document.querySelector('.print-sales-report').classList.add('show');
          }
        }
      }

      if (e.target.matches('.end_date')) {
        const { value } = e.target;
        if (!localStorage.getItem('filterdates')) {
          localStorage.setItem(
            'filterdates',
            JSON.stringify({
              start_date: '',
              end_date: value,
            })
          );
        } else {
          const obj = JSON.parse(localStorage.getItem('filterdates'));

          obj['end_date'] = value;

          localStorage.setItem('filterdates', JSON.stringify(obj));

          const data = JSON.parse(localStorage.getItem('filterdates'));

          if (data?.start_date && data?.end_date) {
            document.querySelector('.sales-report-btn').classList.add('show');

            document.querySelector('.print-sales-report').classList.add('show');
          }
        }
      }
    });

    const page = `
        <div class="dash-container">
        <div class="reports-page">
          <div class="sales-report-table-list">

            <div class="report-comp-details">
              <div>
              <img class="rep-logo" src="assets/uploads/${
                sett?.comp_logo
              }" alt="" />
              </div>
              <div>
              <h5> ${sett?.comp_name}</h5>
              <table>
              <tbody>
              <tr>
              <td>
              <i class="fa fa-map-marker"></i> &nbsp;${sett?.comp_location}
              </td>
              <td>&nbsp;&nbsp;
              <i class="fa fa-globe"></i> &nbsp;${sett?.comp_website}
              </td>
              </tr>
              <tr>
              <td> 
              <i class="fa fa-envelope"></i> &nbsp;${sett?.comp_email}
              </td>
              <td> 
              &nbsp;&nbsp;
              <i class="fa fa-phone"></i>&nbsp; ${sett?.comp_phone}
              </td>
              </tr>
              </tbody>
              </table>
              </div>
              </div>

              <h4>Sales Report</h4>
              <h5>Total: <span class="sales-total">0</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="rep-date">Date: <span class="rpdate"></span></span></h5>

            <div class="start-end-dates">
            <div>
              ${textInput({
                type: 'date',
                classname: 'start_date',
                required: true,
                label: 'Start Date',
              })}
            </div>
            <div>
              ${textInput({
                type: 'date',
                classname: 'end_date',
                required: true,
                label: 'End Date',
              })}
            </div>

            <div>
              <button class="sales-report-btn">Search</button>
            </div>
            </div>

          <div>
            <button class="print-sales-report">Print</button>
          </div>

          <div>
            <table cellspacing="0">
              <thead class="sales-report-table-head">
              <tr class="sales-report-table-row">
              <td>Name</td>
              <td>Date</td>
              <td>Payment</td>
              <td>Balance</td>
              <td>Rec #</td>
              <td>Profile</td>
              </tr>  
              </thead>
              <tbody class="tr-bg sales-report-body">
                
              </tbody>
              </table>
              </div>

          </div>


          </div>
        </div>
  `;
    document.querySelector('.root').innerHTML = Layout('reports', page);
  });
};

export default Reports;
