import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as "zh" | "en");
    toast({
      title: value === "zh" ? "语言已更改" : "Language Changed",
      description: value === "zh" ? "界面语言已切换为中文" : "Interface language changed to English",
    });
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">
          {t("设置", "Settings")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("管理应用程序设置和偏好", "Manage application settings and preferences")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("语言设置", "Language Settings")}</CardTitle>
          <CardDescription>
            {t("选择您的首选界面语言", "Select your preferred interface language")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>{t("界面语言", "Interface Language")}</Label>
            <RadioGroup value={language} onValueChange={handleLanguageChange}>
              <div className="space-y-3">
                <div>
                  <RadioGroupItem
                    value="zh"
                    id="lang-zh"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="lang-zh"
                    className="flex flex-col gap-1 rounded-lg border-2 border-muted bg-card p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary"
                    data-testid="radio-lang-zh"
                  >
                    <span className="font-medium">中文</span>
                    <span className="text-xs text-muted-foreground">
                      使用简体中文显示所有界面
                    </span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="en"
                    id="lang-en"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="lang-en"
                    className="flex flex-col gap-1 rounded-lg border-2 border-muted bg-card p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary"
                    data-testid="radio-lang-en"
                  >
                    <span className="font-medium">English</span>
                    <span className="text-xs text-muted-foreground">
                      Display all interfaces in English
                    </span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
