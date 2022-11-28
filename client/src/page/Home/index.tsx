import React from 'react';
import './index.less'
import topIcon from '@/assets/icon/home/top.png'
import {Carousel} from 'antd';
import r1 from '@/assets/img/home/r1.jpg'
import r2 from '@/assets/img/home/r2.jpg'
import r3 from '@/assets/img/home/r3.jpg'

const videoUrl: Array<string> = ['https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4', 'https://prod-streaming-video-msn-com.akamaized.net/ba258271-89c7-47bc-9742-bcae67c23202/f7ff4fe4-1346-47bb-9466-3f4662c1ac3a.mp4', 'https://prod-streaming-video-msn-com.akamaized.net/b7014b7e-b38f-4a64-bd95-4a28a8ef6dee/113a2bf3-3a5f-45d4-8b6f-e40ce8559da3.mp4']
let videoPlay = function (e: any) {
  e.target.play()
}
let videoStop = (e: any) => {
  e.target.currentTime = 0
  e.target.pause()
}
const Home: React.FC = () => {
  return (
    <div id="home">
      <div className="top-content">
        {/*频道*/}
        <div className="channel">
          <a href="#">热门</a>
          <a href="#">美食</a>
          <a href="#">新闻</a>
          <a href="#">小说</a>
          <a href="#">旅游</a>
          <a href="#" className="more-channel">更多
            <i><img className="icon" src={topIcon} alt=""/></i>
            <div className="channel-box">
              <a href="#">资讯</a>
              <a href="#">资讯</a>
              <a href="#">资讯</a>
              <a href="#">资讯</a>
              <a href="#">资讯</a>
              <a href="#">资讯</a>
            </div>
          </a>
        </div>
        {/*轮播*/}
        <div className="carousel">
          <Carousel autoplay>
            <div>
              <img src={r1} alt=""/>
            </div>
            <div>
              <img src={r2} alt=""/>
            </div>
            <div>
              <img src={r3} alt=""/>
            </div>
          </Carousel>
        </div>
      </div>
      {/* video */}
      <div className="video">
        {videoUrl.map((item: string) =>
          <div className='cover-pic'>
            <video key={item}
                   onMouseLeave={event => videoStop(event)}
                   onMouseEnter={event => videoPlay(event)}
                   width={220} height={150}
                   src={item}></video>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
