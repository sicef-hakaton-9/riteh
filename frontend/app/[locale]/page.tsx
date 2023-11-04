"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import DataTableDemo from "@/components/dataTable/demo";
import Graph from "@/components/lineGraph";
import ImageUpload from "@/components/imageUpload";
import { Textarea } from "@/components/ui/textarea";

export default function Index() {
  const { toast } = useToast();
  return (
    <>
      <div className="flex-wrap flex gap-[8px] justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            toast({
              description: "Friday, February 10, 2023 at 5:57 PM",
              title: "Scheduled: Catch up"
            });
          }}
        >
          Show Toast
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload image</DialogTitle>
              <DialogDescription>Upload image and query for image</DialogDescription>
            </DialogHeader>
            <ImageUpload />
            <Textarea />
            <Button className="w-full">Send</Button>
          </DialogContent>
        </Dialog>
        <DataTableDemo />
        <div className="w-full p-8">
          <Graph
            xKey={"person"}
            yKey={"money"}
            data={[
              {
                money: 100,
                person: 1
              },
              {
                money: 200,
                person: 2
              },
              {
                money: 10,
                person: 3
              }
            ]}
            height={300}
          />
        </div>
      </div>
    </>
  );
}
