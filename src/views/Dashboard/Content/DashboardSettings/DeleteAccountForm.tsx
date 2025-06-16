import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { getApiErrorMessage, del } from '@/lib/axios';
import { useAuth } from '@/context/AuthProvider';

const DeleteAccountForm: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();
    const deleteAccount = async () => {
        try {
            await del('/api/users/me');
            toast.success('Your account has been deleted.');
            logout();
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        } finally {
            setOpen(false);
        }
    };

    return (
        <div className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <p className="text-sm text-muted-foreground">This action cannot be undone. This will permanently delete your account.</p>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2 pt-4">
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={deleteAccount}>
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DeleteAccountForm;
