import React from 'react'

const FormDivider = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="w-1/3 h-[2px] bg-border"></span>
      <span className=''>or</span>
      <span className="w-1/3 h-[2px] bg-border"></span>
    </div>
  );
}

export default FormDivider