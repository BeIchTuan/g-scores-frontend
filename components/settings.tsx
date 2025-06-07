import type { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const Settings: FC = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Cài đặt</CardTitle>
        <CardDescription>Quản lý cài đặt hệ thống</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Giao diện</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Chế độ tối</Label>
              <p className="text-sm text-muted-foreground">Bật chế độ tối cho giao diện</p>
            </div>
            <Switch id="dark-mode" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">Độ tương phản cao</Label>
              <p className="text-sm text-muted-foreground">Tăng độ tương phản cho người dùng khiếm thị</p>
            </div>
            <Switch id="high-contrast" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Thông báo</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Thông báo qua email</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo qua email khi có cập nhật mới</p>
            </div>
            <Switch id="email-notifications" />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="outline">Hủy</Button>
          <Button>Lưu thay đổi</Button>
        </div>
      </CardContent>
    </Card>
  )
}
