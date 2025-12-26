import {Card} from "@/presentation/components/ui/card.tsx";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {AlertCircle, Eye, EyeOff, Loader2, Lock, LogIn, Mail} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import {useState} from "react";
import type {LoginFormData} from "@/presentation/pages/login/login-page.tsx";
import * as React from "react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

interface LoginFormProps {
    sendForm: (data: LoginFormData) => void;
    isSubmitting: boolean;
    isError: boolean;
    resetError: () => void;
}

const LoginForm = ({ sendForm, isSubmitting, isError, resetError }: LoginFormProps) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendForm({...formData});
    }

    return (
        <div className="max-w-md mx-auto">
            <Card className="py-0 bg-white border-slate-200 shadow-sm">
                <div className="p-6 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-slate-900 mb-1">Вхід до системи</h2>
                        <p className="text-slate-600 text-sm">Введіть свої облікові дані</p>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => {
                                        resetError();
                                        return {
                                            ...prev,
                                            email: e.target.value,
                                        };
                                    })}
                                    placeholder="your@email.com"
                                    className="pl-10 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-700">
                                Пароль
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => {
                                        resetError();
                                        return {
                                            ...prev,
                                            password: e.target.value,
                                        };
                                    })}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Надсилання...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Увійти
                                </>
                            )}
                        </Button>
                    </form>

                    {isError && (
                        <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                                Не вдалось увійти. Переконайтесь, що логін та пароль правильні
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default LoginForm;