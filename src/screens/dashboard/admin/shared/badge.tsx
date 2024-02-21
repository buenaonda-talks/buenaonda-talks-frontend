import { ScholarshipConvocatoryKind } from '@/api/graphql';
import { Badge } from '@/components/ui/badge';

type AdminBadgeConvocatoryKindProps = {
    kind: ScholarshipConvocatoryKind;
};

export const AdminBadgeConvocatoryKind = ({ kind }: AdminBadgeConvocatoryKindProps) => {
    if (kind === ScholarshipConvocatoryKind.Platzi) {
        return <Badge variant="success">Platzi</Badge>;
    }

    return <Badge variant="secondary">DEV.F</Badge>;
};
