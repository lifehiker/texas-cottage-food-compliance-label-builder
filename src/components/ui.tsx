import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonAsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: ButtonVariant;
};

type ButtonAsLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition",
    variant === "primary" && "bg-brand text-white hover:bg-brand-deep",
    variant === "secondary" && "bg-foreground text-background hover:opacity-90",
    variant === "outline" && "border border-border bg-white/50 hover:bg-white",
    variant === "ghost" && "hover:bg-white/60",
    className,
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, children, ...linkProps } = props as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return <button className={classes} {...(props as ButtonAsButtonProps)} />;
}

export function Surface({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card-surface rounded-[28px]", className)} {...props} />;
}
