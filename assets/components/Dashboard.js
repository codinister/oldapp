import Layout from './Layout.js';
import Chartbox from './widgets/Chartbox.js';
import Totalbox from './widgets/Totalbox.js';
import productsprofile from './data/serverside/fetch/productsprofile.js';
import customersprofile from './data/serverside/fetch/customersprofile.js';
import usersprofile from './data/serverside/fetch/usersprofile.js';
import { formatMonth, month, year, ymd } from './utils/DateFormats.js';
import Customerswhowe from './widgets/Customerswhowe.js';
import format_number from './utils/format_number.js';
import { textInput } from './utils/InputFields.js';
import getIndustry from './utils/getIndustry.js';

const Dashboard = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.accstatement')) {
      const { cust_id } = e.target.dataset;

      window.location = `assets/pdf/accstatement.php?t=${cust_id}`;
    }
  });


    customersprofile((customers) => {
  

        if(!customers){
          return console.error('Customer data not available!')
        }




        const us = JSON.parse(localStorage.getItem('zsdf'));

        const sales = [...customers]
          .map((v) => v.receipt_list)
          .flat(2)
          .filter((v) => ymd(v.createdAt) === ymd(us?.login_date));


        const profo = customers.map((v) => v?.proforma_list).flat(2);

        const customerstotal = customers.filter(
          (v) => v.fullname !== 'Anonymous'
        );
        const customers_total =
          us?.role_id === '111'
            ? customerstotal.length
            : us?.role_id === '1'
            ? customerstotal.length
            : us?.role_id === '5'
            ? customerstotal.length
            : customerstotal.filter((v) => v.user_id === us?.user_id).length;

        const total_daily_sales = format_number([...sales].reduce((a, b) => {
          return a + Number(b.payment);
        }, 0));
        const daily_sales =
          us?.role_id === '111'
            ? total_daily_sales
            : us?.role_id === '1'
            ? total_daily_sales
            : us?.role_id === '5'
            ? total_daily_sales
            : [...sales]
                .filter((v) => v.user_id === us?.user_id)
                .reduce((a, b) => {
                  return a + Number(b.payment);
                }, 0);

        const industry = getIndustry();





          const prod_desc = 'Total Proforma';
          const Proforma =
            us?.role_id === '111'
              ? profo.length
              : us?.role_id === '1'
              ? profo.length
              : us?.role_id === '5'
              ? profo.length
              : profo.filter((v) => v.user_id === us?.user_id).length;
        

        const dt = new Date();
        const receipts = customers
          .map((v) => v.receipt_list)
          .filter(Boolean)
          .flat(3)
          .filter((v) => year(v.createdAt) === year(dt))
          .map((v) => {
            return {
              payment: Number(v.payment),
              date: v.createdAt,
              month: month(v.createdAt),
              monthWord: formatMonth(v.createdAt),
            };
          })
          .reduce((a, b) => {
            if (a[b.month]) {
              a[b.month].payment += Number(b.payment);
            } else {
              a[b.month] = b;
            }

            return a;
          }, {});

        const receipts_labels = Object.values(receipts).map((v) => v.monthWord);
        const receipts_data = Object.values(receipts).map((v) => v.payment);

        const invoices = customers
          .map((v) => v.invoice_list)
          .filter(Boolean)
          .flat(3)
          .filter((v) => year(v.createdAt) === year(dt))
          .map((v) => {
            return {
              total: Number(v.total),
              date: v.createdAt,
              month: month(v.createdAt),
              monthWord: formatMonth(v.createdAt),
            };
          })
          .reduce((a, b) => {
            if (a[b.month]) {
              a[b.month].total += Number(b.total);
            } else {
              a[b.month] = b;
            }

            return a;
          }, {});

        const sales_labels = Object.values(invoices).map((v) => v.monthWord);
        const sales_data = Object.values(invoices).map((v) => v.total);

        const custs = customers
          .filter((v) => year(v.createdAt) === year(dt))
          .map((v) => {
            return {
              total: 1,
              date: v.createdAt,
              month: month(v.createdAt),
              monthWord: formatMonth(v.createdAt),
            };
          })
          .reduce((a, b) => {
            if (a[b.month]) {
              a[b.month].total += Number(b.total);
            } else {
              a[b.month] = b;
            }

            return a;
          }, {});

        const custs_labels = Object.values(custs).map((v) => v.monthWord);
        const custs_data = Object.values(custs).map((v) => v.total);

        const colors = [
          'rgb(241,197,229)',
          'rgb(241,173,246)',
          'rgb(245,198,182)',
          'rgb(248,125,67)',
          'rgb(67,186,127)',
          'rgb(255,212,60)',
          'rgb(255,190,52)',
          'rgb(204,101,248)',
          'rgb(132,30,255)',
          'rgb(160,230,116)',
          'rgb(254,102,133)',
          'rgb(97,106,251)',
        ];

        const owings = customers
          .filter((v) => v.total_debt > 1)
          .map((v) => ({
            cust_id: v.cust_id,
            fullname: v.fullname,
            debt: Number(v.total_debt),
            phone: v.phone,
          }));

        const total_debt = [...owings].reduce((a, b) => {
          return Number(a) + Number(b.debt);
        }, 0);

        document.addEventListener('keyup', (e) => {
          if (e.target.matches('.search-arrears')) {
            const val = e.target.value;
            const res = owings
              .filter((v) =>
                Object.values(v)
                  .join(' ')
                  .toLowerCase()
                  .includes(val.toLowerCase())
              )
              .map(
                (v) => `
                  <tr  class="arrears-table-row">
                    <td>
                    <a href="javascript:void(0);" class="accstatement" data-cust_id="${
                      v.cust_id
                    }">
                    ${v.fullname}
                    </a>
                    </td>
                    <td>${v.phone}</td>
                    <td>${format_number(v.debt)}</td>
                  </tr>
                  `
              )
              .join(' ');

            document.querySelector('.tr-bg').innerHTML = res;
          }
        });

        const page = `
          <section class="dashboard-section">
            <div class="dashboard-container">
              <div class="total-wrapper">
                ${Totalbox('Total Customers', customers_total)}
                ${Totalbox('Daily Sales', 'GHs '+daily_sales)}
                ${Totalbox(prod_desc, Proforma)}
              </div>
            </div>
            <div class="dashboard-container">
            <div class="chartbox-wrapper">
                ${Chartbox('display-chart1', sales_labels, [
                  {
                    data: sales_data,
                    label: year(dt) + ' Sales',
                    backgroundColor: colors.slice(0, sales_data.length),
                    borderColor: 'rgb(66,92,89)',
                    borderWidth: '1',
                  },
                ])}
                ${Chartbox('display-chart2', receipts_labels, [
                  {
                    data: receipts_data,
                    label: year(dt) + ' Receipts',
                    backgroundColor: colors.slice(0, receipts_data.length),
                    borderColor: 'rgb(66,92,89)',
                    borderWidth: '1',
                  },
                ])}
            </div>
            </div>
            <div class="dashboard-container">
            <div class="chartbox-wrapper">
                ${Chartbox('display-chart3', custs_labels, [
                  {
                    data: custs_data,
                    label: year(dt) + ' Customers',
                    backgroundColor: colors.slice(0, custs_data.length),
                    borderColor: 'rgb(66,92,89)',
                    borderWidth: '1',
                  },
                ])}

                <div>
                <div class="owing-wrapper">

                <div>    
                <div> Arrears: <span>${format_number(total_debt)}</span> </div>
                <div>
                    ${textInput({
                      type: 'text',
                      classname: 'search-arrears',
                      required: true,
                      label: 'Search arrears',
                    })}
                </div>
                </div>

                <div>
                ${Customerswhowe(owings)}
                </div>

                </div>
                </div>


            </div>
            </div>
            </section>
            `;

        document.querySelector('.root').innerHTML = Layout('dashboard', page);
      });

};

export default Dashboard;
