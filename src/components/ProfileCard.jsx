import { Suspense } from 'react';
import Lanyard from './Lanyard';

function ProfileCard() {
  return (
    <div className="relative w-full" style={{ height: '500px', overflow: 'visible' }}>
      <Suspense fallback={
        <div className="flex items-center justify-center" style={{ height: '500px' }}>
          <div className="text-emerald-400 text-xl">Carregando...</div>
        </div>
      }>
        <Lanyard 
          position={[0, 0, 10]} 
          gravity={[0, -15, 0]} 
          fov={40}
          transparent={true}
        />
      </Suspense>
    </div>
  );
}

export default ProfileCard;
