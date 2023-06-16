import React from 'react';
import professorImg from '../../../assets/Images/home/professor.png';
import { Slide } from 'react-awesome-reveal';

const StartTeaching = () => {
    return (
        <section className='md:grid grid-cols-2 items-center p-5 mt-16'>
            <Slide direction='left' triggerOnce>
            <img src={professorImg} alt="professor_image" />
            </Slide>
            <Slide direction='right' triggerOnce>
            <div className='space-y-5 md:w-3/4'>
                <h2 className='text-4xl capitalize font-bold'>Start Teaching Today!</h2>
                <p className=' font-light text-lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid reiciendis cum odio vitae placeat vero fugiat eaque sint, ratione sed?</p>
                <button className='btn bg-ca-primary hover:bg-ca-secondary text-white font-bold rounded-none'>Start Teaching</button>
            </div>
            </Slide>
        </section>
    );
};

export default StartTeaching;