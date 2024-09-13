import {RouterProvider} from 'react-router-dom';
import {ConfigProvider} from 'antd';

import {router} from './routing/routes';
import {theme} from "../shared/theme";

export const App = () => (
  <ConfigProvider
    theme={theme}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
