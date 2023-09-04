import {useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ViewReport({open, setOpen, report}) {
    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
            >
                <h2 className="text-lg p-4">Report n° {report._id}</h2>
                <DialogContent dividers>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                            <div className="text-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Client</h3>
                                <p className="text-sm mb-1">{report.client.name}</p>
                                <p className="text-sm mb-1">{report.client.address}</p>
                                <p className="text-sm mb-1">{report.client.contact}</p>
                            </div>
                            <div className="text-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Report</h3>
                                <p className="text-sm">{report.report}</p>
                            </div>
                            <div className="text-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Articles</h3>
                                <ul className="list-inside list-decimal">
                                    {report.articles.map((article) => (
                                        <li key={article._id} className="text-sm mb-1 list-none">
                                            {article.quantity} x {article.name} : {article.quantity * article.price} $
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {report.provisional_total && (
                            <div className="text-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Provisional Sales</h3>
                                <p className="text-sm mb-2">{report.provisional_total}</p>
                                <ul className="list-inside list-decimal">
                                    {report.provisional_articles.map((article) => (
                                        <li key={article._id} className="text-sm mb-1 list-none">
                                            {article.quantity} x {article.name} = {article.quantity * article.price} $
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            )}
                            <div className="text-gray-800 col-span-full">
                                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                                <p className="text-xl font-bold">{report.total_sales} $</p>
                            </div>
                        </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-gray" onClick={handleClose}>Close</button>
                </DialogActions>
            </Dialog>
    );
}
