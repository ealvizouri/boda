"use client";

import { useRef } from "react";
import { Input, Button, Space } from "antd";
import type { InputRef, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Search } from "lucide-react";

export function useSearchFilter<T>(
  dataIndex: keyof T,
): Pick<TableColumnType<T>, "filterDropdown" | "filterIcon" | "onFilter"> {
  const searchInput = useRef<InputRef>(null);

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div className="p-2 flex flex-col gap-2">
        <Input
          ref={searchInput}
          placeholder="Buscar…"
          value={selectedKeys[0] as string}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          size="small"
          className="w-40"
        />
        <Space>
          <Button type="primary" onClick={() => confirm()} size="small">
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
            size="small"
          >
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Search
        size={13}
        className={filtered ? "text-brick-red" : "text-muted-olive-400"}
      />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes(String(value).toLowerCase()),
  };
}
