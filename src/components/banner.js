import './banner.css';

function Banner(){
    return(
        <section className='banner'> 
            <header>
                    <img src='/img/banner.png.jpg' alt='banner img'/>
                <div className='banner-header'>
                    <p>TaskSwift</p>
                </div>
                <div className='banner-components'>
                    <h5>Optimize your time</h5>
                    <p> Manage your day without leaving any task behind</p>
                    <a href='#'>Start</a>
                </div>
            </header> 
        </section>
    )
}

export default Banner;