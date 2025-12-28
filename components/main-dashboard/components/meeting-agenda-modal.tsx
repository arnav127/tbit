"use client"
import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface MeetingAgendaModalProps {
  isAgendaOpen: boolean;
  setIsAgendaOpen: (isOpen: boolean) => void;
  selectedMeeting: any;
  isEditingAgenda: boolean;
  setIsEditingAgenda: (isEditing: boolean) => void;
  agendaNotes: string;
  setAgendaNotes: (notes: string) => void;
  handleUpdateAgenda: () => void;
}

export const MeetingAgendaModal: FC<MeetingAgendaModalProps> = ({
  isAgendaOpen,
  setIsAgendaOpen,
  selectedMeeting,
  isEditingAgenda,
  setIsEditingAgenda,
  agendaNotes,
  setAgendaNotes,
  handleUpdateAgenda,
}) => {
  return (
    <Dialog open={isAgendaOpen} onOpenChange={setIsAgendaOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Meeting Agenda</DialogTitle>
          <DialogDescription>
            {selectedMeeting?.title}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Client</Label>
            <div className="col-span-3">{selectedMeeting?.client_name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Date</Label>
            <div className="col-span-3">
              {selectedMeeting?.date && new Date(selectedMeeting.date).toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Attendees</Label>
            <div className="col-span-3">
              {selectedMeeting?.attendees?.join(", ") || "No attendees listed"}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right font-bold mt-1">Notes / Agenda</Label>
            <div className="col-span-3">
              {isEditingAgenda ? (
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={agendaNotes}
                  onChange={(e) => setAgendaNotes(e.target.value)}
                />
              ) : (
                <div className="min-h-[100px] p-3 bg-slate-50 rounded-md border border-slate-100 text-sm">
                  {selectedMeeting?.notes || "No agenda details available."}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {isEditingAgenda ? (
            <>
              <Button variant="outline" onClick={() => setIsEditingAgenda(false)}>Cancel</Button>
              <Button onClick={handleUpdateAgenda}>Save Changes</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditingAgenda(true)}>Edit Agenda</Button>
              <Button onClick={() => setIsAgendaOpen(false)}>Close</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
