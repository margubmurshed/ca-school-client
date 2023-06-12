import React from 'react';
import professorImg from '../../../assets/Images/home/professor.png';

const StartTeaching = () => {
    return (
        <section className='md:grid grid-cols-2 items-center p-5 mt-16'>
            <img src={professorImg} alt="professor_image" />
            <div className='space-y-5 md:w-3/4'>
                <h2 className='text-4xl capitalize font-bold'>Start Teaching Today!</h2>
                <p className='font-thin text-xl'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid reiciendis cum odio vitae placeat vero fugiat eaque sint, ratione sed?</p>
                <button className='btn bg-ca-primary hover:bg-ca-secondary text-white font-bold rounded-none'>Start Teaching</button>
            </div>
        </section>
    );
};

export default StartTeaching;