// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import cái "Khung nhà"
import { RootLayout } from './RootLayout'; // (Kiểm tra lại đường dẫn này)

// Import các "Trang"
import { WelcomePage } from './welcome';     // (Kiểm tra lại đường dẫn này)
import { PersonalInfoPage } from './info'; // (Kiểm tra lại đường dẫn này)
import  {PasswordTester} from './PassTest'; // (Kiểm tra lại đường dẫn này)
import {Result}  from './result';  

// Định nghĩa các tuyến đường
const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />, // Luôn hiển thị "Khung nhà"
    children: [
      {
        path: '/', 
        element: <WelcomePage />, // Trang chủ là trang Chào mừng
      },
      {
        path: '/info', 
        element: <PersonalInfoPage/>,
      },
      {
        path: '/tester', 
        element: <PasswordTester />,
      },
      {
        path: '/result',
        element: <Result />,
      },
    ],
  },
]);

// Component App giờ CHỈ trả về "Bộ não"
function App() {
  return <RouterProvider router={router} />;
}

export default App;