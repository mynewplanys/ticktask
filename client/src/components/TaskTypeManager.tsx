import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Trash2 } from "lucide-react";

export type TaskType = {
  value: string;
  label: string;
  labelEn: string;
};

type TaskTypeManagerProps = {
  taskTypes: TaskType[];
  onTaskTypesChange: (types: TaskType[]) => void;
};

export function TaskTypeManager({ taskTypes, onTaskTypesChange }: TaskTypeManagerProps) {
  const [open, setOpen] = useState(false);
  const [newTypeLabelZh, setNewTypeLabelZh] = useState("");
  const [newTypeLabelEn, setNewTypeLabelEn] = useState("");

  const handleAddType = () => {
    if (!newTypeLabelZh.trim() || !newTypeLabelEn.trim()) return;

    const newValue = newTypeLabelEn.toLowerCase().replace(/\s+/g, "_");
    const newType: TaskType = {
      value: newValue,
      label: `${newTypeLabelZh} ${newTypeLabelEn}`,
      labelEn: newTypeLabelEn,
    };

    onTaskTypesChange([...taskTypes, newType]);
    setNewTypeLabelZh("");
    setNewTypeLabelEn("");
    console.log("Task type added:", newType);
  };

  const handleDeleteType = (value: string) => {
    onTaskTypesChange(taskTypes.filter((type) => type.value !== value));
    console.log("Task type deleted:", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-testid="button-manage-task-types"
        >
          <Settings className="h-4 w-4 mr-2" />
          管理任务类型 Manage Types
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>任务类型管理 Task Type Management</DialogTitle>
          <DialogDescription>
            添加、删除或修改任务类型 Add, delete or modify task types
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>现有任务类型 Existing Types</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {taskTypes.map((type) => (
                <div
                  key={type.value}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-card"
                  data-testid={`task-type-item-${type.value}`}
                >
                  <Badge variant="outline" className="text-sm">
                    {type.label}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteType(type.value)}
                    data-testid={`button-delete-type-${type.value}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>添加新类型 Add New Type</Label>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="new-type-zh" className="text-xs text-muted-foreground">
                  中文名称 Chinese Name
                </Label>
                <Input
                  id="new-type-zh"
                  placeholder="例如：运动"
                  value={newTypeLabelZh}
                  onChange={(e) => setNewTypeLabelZh(e.target.value)}
                  data-testid="input-new-type-zh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-type-en" className="text-xs text-muted-foreground">
                  英文名称 English Name
                </Label>
                <Input
                  id="new-type-en"
                  placeholder="例如：Exercise"
                  value={newTypeLabelEn}
                  onChange={(e) => setNewTypeLabelEn(e.target.value)}
                  data-testid="input-new-type-en"
                />
              </div>
              <Button
                type="button"
                onClick={handleAddType}
                className="w-full"
                disabled={!newTypeLabelZh.trim() || !newTypeLabelEn.trim()}
                data-testid="button-add-type"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加类型 Add Type
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
