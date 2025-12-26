type LogoProps = {
    isFull: boolean;
}
const Logo = ({ isFull }: LogoProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">B</span>
                </div>
                {isFull &&
                    <div>
                        <h1 className="text-slate-900">Blanidas Service System</h1>
                        <p className="text-slate-600 text-sm">Панель інженера</p>
                    </div>
                }
            </div>
        </div>
    )
};

export default Logo;