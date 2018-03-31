const potatoUrl = ['https://orig00.deviantart.net/b707/f/2014/104/4/a/kawaii_mascot__kawaii_potato_by_lolitpop-d7eive2.png',
    'https://vignette.wikia.nocookie.net/justdance/images/f/f7/Kawaii_potato_by_hashtagpony-d7xbs1t.png/revision/latest/scale-to-width-down/388?cb=20170408221348', 'https://media.giphy.com/media/RjJFVxioBHprq/giphy.gif',
    'https://media.giphy.com/media/IRv9szzwmDvO0/giphy.gif', 'https://media.giphy.com/media/3o7bu2SCFIiICu7RWU/giphy.gif',
    'http://hddfhm.com/images/clipart-potato-6.png', 'http://www.ptto.io/static/media/logo.f1c8062d.png', 'https://www.crazyfreshkids.com/wp-content/uploads/2016/07/kyf-potato.png', 'https://media.giphy.com/media/vWYWQT75Fz3sk/giphy.gif', 'https://orig00.deviantart.net/997a/f/2017/115/5/8/dancing_potato_by_kangarooloo-db73148.gif', 'https://orig00.deviantart.net/67f0/f/2017/044/8/d/_animation__dancing_potato___garen_s_dance_by_llnavi-daywrb2.gif', 'http://38.media.tumblr.com/8716afffe0466fc28c0dab1a9f40c123/tumblr_ne87wzJb0p1qj1gfxo1_1280.gif', 'https://static1.squarespace.com/static/576fbefb03596ece783182ab/t/57d55145ebbd1a582b503887/1473597773999/potato.gif', 'https://media.giphy.com/media/u3LOUXoSUKxry/giphy.gif', 'https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_60/v1/405230/no_computers_wrtr0a.gif', 'https://orig00.deviantart.net/405c/f/2016/037/d/8/ask_unicorn_potato_baby__by_anonrich-d9qptxp.gif', 'https://orig00.deviantart.net/b8b7/f/2014/310/c/7/id_by_frozen9-d85gzsa.gif', 'https://1.bp.blogspot.com/-6FrziGlC1hs/WHig6AkKpNI/AAAAAAANGnU/rO9P-THTmTciurI81ghek4Ybym_rTITtgCLcB/s1600/AW363685_00.gif',
    'https://orig00.deviantart.net/f328/f/2017/307/0/0/webp_net_gifmaker__16__by_partybug98-dbsn8bi.gif', 'https://media.giphy.com/media/5FFRyH39kzw0U/giphy.gif', 'http://78.media.tumblr.com/74e8e869b99a2411a722cc1dfa5880e9/tumblr_n4zunixsFi1r5ye5io1_500.gif', 'http://i.imgur.com/Zp8iYfq.gif', 'https://www.littlepotatoes.com/wp-content/uploads/2015/08/fingerling.-3.gif', 'https://orig13.deviantart.net/3a48/f/2015/223/3/c/untitled_drawing_by_ripperfangs-d95ab0w.png', 'http://78.media.tumblr.com/tumblr_me4lr36XdW1qenbiv.gif', 'https://www.littlepotatoes.com/wp-content/uploads/2015/08/gold-2.gif', 'http://doce.ginpu.us/wp-content/uploads/2013/04/finished.gif', 'http://www.ooze.com/ooze13/images/pentagon/potato.gif'];

let potatoCount = 0;

const cornifyUpdateCount = () => {
    let p = document.getElementById('cornifycount');
    if (p == null) {
        p = document.createElement('p');
        p.id = 'cornifycount';
        p.style.position = 'fixed';
        p.style.bottom = '5px';
        p.style.left = '0px';
        p.style.right = '0px';
        p.style.zIndex = '1000000000';
        p.style.color = '#ffc284';
        p.style.textAlign = 'center';
        p.style.fontSize = '32px';
        p.style.fontFamily =
            "'Comic Sans MS', 'Comic Sans', 'Marker Felt', serif";
        const body = document.querySelector('body');
        body.appendChild(p);
    }
    if (potatoCount === 1) {
        p.innerHTML = `${potatoCount} POTATO SUMMONED`;
    } else {
        p.innerHTML = `${potatoCount} POTATOES SUMMONED`;
    }
};

function animateStart() {
    const size = 1 + (Math.round(Math.random() * 10) / 100);
    const angle = Math.round((Math.random() * 50) - 10);
    this.style.transform = `rotate(${angle}deg) scale(${size}, ${size})`;
}

function animateEnd() {
    const size = 0.9 + (Math.round(Math.random() * 10) / 100);
    const angle = Math.round((Math.random() * 6) - 3);
    this.style.transform = `rotate(${angle}deg) scale(${size}, ${size})`;
}

function addPotato() {
    potatoCount += 1;
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.classList.add('potato');

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    div.onclick = addPotato;
    div.style.zIndex = 10;
    div.style.top = `${Math.round(windowHeight * Math.random() * 0.75)}px`;
    div.style.left = `${Math.round(windowWidth * Math.random() * 0.75)}px`;

    const img = document.createElement('img');
    img.setAttribute('src', potatoUrl[Math.floor(Math.random() * potatoUrl.length)]);
    div.style.transition = 'all .1s linear';
    div.style.transform = 'rotate(10deg) scale(1.2)';

    div.addEventListener('mouseover', animateStart);
    div.addEventListener('mouseout', animateEnd);

    const body = document.querySelector('body');
    cornifyUpdateCount();
    div.appendChild(img);
    body.appendChild(div);
}
