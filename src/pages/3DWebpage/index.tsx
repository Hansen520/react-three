import { useEffect } from 'react';
import { init } from './3d-init';

interface DWebpackProps {

}

const DWebpack: React.FC<DWebpackProps> = () => {

    useEffect(() => {
        const dom = document.getElementById('content') as HTMLElement;
        const { scene } = init(dom);

        return () => {
            dom.innerHTML = '';
        }
    }, []);
    return (
        <div>
            <div id="main">
                <div id="content" className='fixed top-0 left-0'>
                </div>
                <div className='section section1 h-[100vh] text-center'>
                    <h1>迪迦奥特曼</h1>
                </div>
                <div className='section section2 h-[100vh] text-center bg-pink-200'>
                    <h1>黎明前的黑暗</h1>
                </div>
                <div className='section section3 h-[100vh] text-center'>
                    <h1 className='pt-[50px] text-[50px]'>你相信光吗？</h1>
                </div>
                <div className='section section4 h-[100vh] text-center'>
                    <h1>花儿飘啊飘</h1>
                </div>
                <div className='section section5 h-[100vh] text-center'>
                    
                </div>
                <div className='section section6 h-[100vh] text-center'>
                    
                </div>
                <div className='section section7 h-[100vh] text-center'>
                    <h1>页面尾部</h1>
                </div>
            </div>
        </div>
    );
}

export default DWebpack;