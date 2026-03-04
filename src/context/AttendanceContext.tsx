import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AttendanceLog {
    id: number;
    date: string;
    timeIn: string;
    timeOut: string;
    status: string;
    hours: string;
    remarks: string;
}

interface AttendanceForm {
    timeIn: string;
    timeOut: string;
    overtime: string;
    remarks: string;
}

interface AttendanceContextType {
    attendanceForm: AttendanceForm;
    setAttendanceForm: React.Dispatch<React.SetStateAction<AttendanceForm>>;
    punchedIn: boolean;
    setPunchedIn: React.Dispatch<React.SetStateAction<boolean>>;
    punchedOut: boolean;
    setPunchedOut: React.Dispatch<React.SetStateAction<boolean>>;
    myAttendance: AttendanceLog[];
    setMyAttendance: React.Dispatch<React.SetStateAction<AttendanceLog[]>>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
    // State is moved here to persist globally across pages
    const [attendanceForm, setAttendanceForm] = useState<AttendanceForm>({ timeIn: '', timeOut: '', overtime: '0', remarks: '' });
    const [punchedIn, setPunchedIn] = useState(false);
    const [punchedOut, setPunchedOut] = useState(false);
    
    // You can remove this mock data later when you connect to a real database API
    const [myAttendance, setMyAttendance] = useState<AttendanceLog[]>([
        { id: 1, date: '2026-03-02', timeIn: '08:00 AM', timeOut: '05:00 PM', status: 'Present', hours: '8.0', remarks: 'Regular Shift' },
        { id: 2, date: '2026-03-01', timeIn: '07:45 AM', timeOut: '04:45 PM', status: 'Present', hours: '8.0', remarks: 'Early Shift' },
    ]);

    return (
        <AttendanceContext.Provider value={{
            attendanceForm, setAttendanceForm,
            punchedIn, setPunchedIn,
            punchedOut, setPunchedOut,
            myAttendance, setMyAttendance
        }}>
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    const context = useContext(AttendanceContext);
    if (context === undefined) {
        throw new Error('useAttendance must be used within an AttendanceProvider');
    }
    return context;
};