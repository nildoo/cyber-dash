import React, { Suspense } from 'react'

import Loader from './Loader'

const Loadable = (Component: any) => function C (props: any) {
  return <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
}

export default Loadable
