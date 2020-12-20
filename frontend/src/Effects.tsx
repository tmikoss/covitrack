import React, { memo, Suspense} from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useDetectGPU } from '@react-three/drei/useDetectGPU'

export const Effects: React.FC = memo(() => {
  const { tier, isMobile } = useDetectGPU() || { tier: 0}

  if (isMobile || tier === 0) {
    return null
  }

  return <Suspense fallback={null}>
    <EffectComposer>
      <Bloom luminanceThreshold={0.4} luminanceSmoothing={1} intensity={2} key='bloom' />
    </EffectComposer>
  </Suspense>
})
