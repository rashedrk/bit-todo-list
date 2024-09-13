import Image from 'next/image';
import no_data from '@/assets/no_data.svg'

const NoData = () => {
    return (
        <div className='flex justify-center items-center min-h-[90vh]'>
            <Image src={no_data} alt='no data found' height={500} width={500}/>
    </div>
    );
};

export default NoData;