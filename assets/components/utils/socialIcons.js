const socialicons = () => {
  const sess = JSON.parse(localStorage.getItem('zsdf'));
  return `
    <div class="socialicons">
        <div>
            <a href="${
              sess?.facebook || 'https://www.facebook.com'
            }" target="_blank" title="Facebook">
            <i class="fa fa-facebook"></i>
            </a>
            <a href="${
              sess?.instagram || 'https://www.instagram.com'
            }" target="_blank"  title="Instagram">
            <i class="fa fa-instagram"></i>
            </a>
            <a href="${
              sess?.twitter || 'https://www.twitter.com/'
            }" target="_blank"  title="Twitter">
            <i class="fa fa-twitter"></i>
            </a>
            <a href="${sess?.email_url}" target="_blank"  title="Email">
            <i class="fa fa-envelope"></i>
            </a>
        </div>
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>

    </div>
    `;
};

export default socialicons;
