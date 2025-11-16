// src/InfoContext.tsx
import { createContext, useContext, useState } from 'react';

// Định nghĩa "hình dạng" của dữ liệu trong kho
interface IInfoContext {
  name: string;
  birthday: string;
  nickname: string;
  password: string;
  setName: (val: string) => void;
  setBirthday: (val: string) => void;
  setNickName: (val: string) => void;
  setPassword: (val: string) => void;
}

// 1. Tạo cái "Kho"
const InfoContext = createContext<IInfoContext | null>(null);

// 2. Tạo "Người Quản Kho" (Provider)
//    Đây là component sẽ "bọc" app của bạn
export function InfoProvider({ children }: { children: React.ReactNode }) {
  // Đây chính là "state" được chia sẻ
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <InfoContext.Provider value={{ name, birthday, nickname,password, setName, setBirthday, setNickName, setPassword }}>
      {children}
    </InfoContext.Provider>
  );
}

// 3. Tạo một "Chìa khóa" (Hook)
//    Để các trang con "mở kho" và lấy/cất dữ liệu
export function useInfo() {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error('useInfo phải được dùng bên trong InfoProvider');
  }
  return context;
}