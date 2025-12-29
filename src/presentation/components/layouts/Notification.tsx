type NotificationProps = {
    type: "success" | "error";
    message: string;
    className?: string
};

const Notification: React.FC<NotificationProps> = ({ type, message, className }) => {
    const baseClasses = "text-sm px-4 py-2 rounded-md shadow-sm text-center";
    const typeClasses = type === "success"
        ? "bg-green-50 border border-green-200 text-green-700"
        : "bg-red-50 border border-red-200 text-red-700";

    return <div className={`${className} ${baseClasses} ${typeClasses}`}>{message}</div>;
};

export default Notification;
