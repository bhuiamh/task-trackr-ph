import React from 'react';

const SectionTitle = ({title, subtitle}) => {
    return (
        <div className='w-full flex flex-col items-center justify-center space-y-1 lg:space-y-2'>
            <h1 className='text-white text-base md:text-xl lg:text-2xl font-bold uppercase'>{title}</h1>
            <div className='border-b-2 border-double border-primary w-1/3'></div>
            <h1 className='text-white text-sm md:text-base lg:text-xl font-semibold'>{subtitle}</h1>
        </div>
    );
};

export default SectionTitle;