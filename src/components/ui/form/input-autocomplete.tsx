"use client";

import React from "react";
import {
   CommandGroup,
   CommandItem,
   CommandList,
   CommandInput,
   CommandInputProps
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { useClickOutside } from "@/hooks/click-outside";

interface AutoCompleteProps extends Omit<CommandInputProps, "onValueChange"> {
   options: Option[];
   emptyMessage: string;
   isLoading?: boolean;
   disabled?: boolean;
   onValueChange?: (value: Option) => void;
}

export const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
   (
      { options, placeholder, emptyMessage, disabled, isLoading = false, onValueChange, ...props },
      ref
   ) => {
      const [isOpen, setOpen] = React.useState(false);
      const [inputValue, setInputValue] = React.useState<string>("");

      const inputRef = React.useRef<HTMLInputElement>(null);
      const containerRef = React.useRef<HTMLDivElement>(null);
      React.useImperativeHandle(ref, () => inputRef.current!);
      useClickOutside({ ref: containerRef, closeFn: () => setOpen(false) });

      const handleKeyDown = React.useCallback(
         (event: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (!input) return;

            if (event.key === "Escape") input.blur();
            if (event.key === "Enter" && input.value !== "") {
               const optionToSelect = options.find((option) => option.label === input.value);
               if (optionToSelect && onValueChange) onValueChange(optionToSelect);
            }
         },
         [options, onValueChange]
      );

      const handleSelectOption = React.useCallback(
         (selectedOption: Option) => {
            setInputValue(selectedOption.label);
            if (onValueChange) onValueChange(selectedOption);
            setTimeout(() => inputRef?.current?.blur(), 0);
         },
         [onValueChange]
      );

      return (
         <CommandPrimitive ref={containerRef} onKeyDown={handleKeyDown}>
            <div>
               <CommandInput
                  {...props}
                  ref={inputRef}
                  value={inputValue}
                  onValueChange={isLoading ? undefined : setInputValue}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="text-base"
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
               />
            </div>

            <div className="relative mt-1">
               <div
                  className={cn(
                     "animate-in fade-in-0 zoom-in-95 border-border absolute top-0 z-10 w-full rounded-md border bg-white outline-none",
                     isOpen ? "block" : "hidden"
                  )}
               >
                  <CommandList>
                     {isLoading && (
                        <CommandPrimitive.Loading>
                           <div className="h-8 w-full animate-pulse p-1" />
                        </CommandPrimitive.Loading>
                     )}

                     {options.length > 0 && !isLoading && (
                        <CommandGroup>
                           {options.map((option) => {
                              return (
                                 <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onMouseDown={(event) => {
                                       event.preventDefault();
                                       event.stopPropagation();
                                    }}
                                    onSelect={() => handleSelectOption(option)}
                                    className={"flex w-full items-center gap-2"}
                                 >
                                    {option.label}
                                 </CommandItem>
                              );
                           })}
                        </CommandGroup>
                     )}

                     {!isLoading && (
                        <CommandPrimitive.Empty className="rounded-sm px-2 py-3 text-center text-sm select-none">
                           {emptyMessage}
                        </CommandPrimitive.Empty>
                     )}
                  </CommandList>
               </div>
            </div>
         </CommandPrimitive>
      );
   }
);

AutoComplete.displayName = "InputAutoComplete";
